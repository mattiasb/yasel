#!/usr/bin/env node
/*
 * Copyright ⓒ 2015 Mattias Bengtsson <mattias.jc.bengtsson@gmail.com>
 *
 * Yasel is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Yasel is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Mattias Bengtsson <mattias.jc.bengtsson@gmail.com>
 */

var nomnom = require("nomnom"),
    path   = require("path"),
    fs     = require("fs"),
    $      = require("fquery");

$.plugin('fquery-comment');

var opts = nomnom
        .script("yasel")
        .nocolors()
        .options(require("./options.json"))
        .parse();
        
var modes = loadConfig(opts['modes-config']);
for (var mode in modes) {
    var modeOpts = modes[mode];
    compileTemplates(opts.src,
                     modeOpts,
                     path.join(opts.dest, mode));
}

///////////////
// Functions //
///////////////

// Load the modes config
function loadConfig(fpath) {    
    if (fpath) {
        try {
            return JSON.parse(fs.readFileSync(fpath, "utf8"));
        } catch(error) {
            console.log("Couldn't load config file [" + fpath + "]");
            
            process.exit(1);
            return undefined;
        }
    } else {
        return require("./modes.json");
    }
}

// Print the default configuration
function printConfig() {
    var path = require.resolve("./modes.json");
    process.stdout.write(fs.readFileSync(path, "utf8"));
}

// Compile all templates in SRC and move it to DEST
function compileTemplates(src, compileOptions, dest) {
    $(path.join(src, "*"))
        .comment(compileOptions.pre,
                 compileOptions.body,
                 compileOptions.post)
        .wrap(["# -*- mode: snippet -*-",
               "# group: Licenses",
               "# --",
               ""].join('\n'))
        .write(function(blob) {
            return path.join(dest,
                             path.basename(blob.source));
        }, true);
}
