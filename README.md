# Paste Code
![License](https://img.shields.io/badge/License-MIT-blue.svg)

## Plain Text Editor
[https://github.com/ZhengLinLei/paste](https://github.com/ZhengLinLei/paste)


## What is this?
This is a service made in client-side javascript. It turns code into [LZMA](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm)-compressed, [Base64](https://en.wikipedia.org/wiki/Base64)-encoded URLs.

## How do I use it?
Paste your code into the text box, and click the "Paste" button. The URL will be updated to reflect the new paste. You can also use the "Copy" button to copy the URL to your clipboard.

## How to activate highlighting?
Just only write `!<LANGUAGE>` at the beginning of the text. For example, if you want to highlight the code as `python`, you can write `!PYTHON` or `!PY` at the beginning of the text.

The supported languages are as follows in this file: [languages](./languages.md)

```
Markup - markup, html, xml, svg, mathml, ssml, atom, rss
CSS - css
C-like - clike
JavaScript - javascript, js
ABAP - abap
ABNF - abnf
ActionScript - actionscript
Ada - ada
Agda - agda
AL - al
ANTLR4 - antlr4, g4
Apache Configuration - apacheconf
Apex - apex
APL - apl
AppleScript - applescript
AQL - aql
Arduino - arduino, ino
ARFF - arff
ARM Assembly - armasm, arm-asm
Arturo - arturo, art
AsciiDoc - asciidoc, adoc
ASP.NET (C#) - aspnet
6502 Assembly - asm6502
Atmel AVR Assembly - asmatmel
AutoHotkey - autohotkey
AutoIt - autoit
AviSynth - avisynth, avs
Avro IDL - avro-idl, avdl
AWK - awk, gawk
Bash - bash, sh, shell
BASIC - basic
Batch - batch
BBcode - bbcode, shortcode
BBj - bbj
Bicep - bicep
Birb - birb
Bison - bison
BNF - bnf, rbnf
BQN - bqn
Brainfuck - brainfuck
BrightScript - brightscript
Bro - bro
BSL (1C:Enterprise) - bsl, oscript
C - c
C# - csharp, cs, dotnet
C++ - cpp
CFScript - cfscript, cfc
ChaiScript - chaiscript
CIL - cil
Cilk/C - cilkc, cilk-c
Cilk/C++ - cilkcpp, cilk-cpp, cilk
Clojure - clojure
CMake - cmake
COBOL - cobol
CoffeeScript - coffeescript, coffee
Concurnas - concurnas, conc
Content-Security-Policy - csp
Cooklang - cooklang
Coq - coq
Crystal - crystal
CSS Extras - css-extras
CSV - csv
CUE - cue
Cypher - cypher
D - d
Dart - dart
DataWeave - dataweave
DAX - dax
Dhall - dhall
Diff - diff
Django/Jinja2 - django, jinja2
DNS zone file - dns-zone-file, dns-zone
Docker - docker, dockerfile
DOT (Graphviz) - dot, gv
EBNF - ebnf
EditorConfig - editorconfig
Eiffel - eiffel
EJS - ejs, eta
Elixir - elixir
Elm - elm
Embedded Lua templating - etlua
ERB - erb
Erlang - erlang
Excel Formula - excel-formula, xlsx, xls
F# - fsharp
Factor - factor
False - false
Firestore security rules - firestore-security-rules
Flow - flow
Fortran - fortran
FreeMarker Template Language - ftl
GameMaker Language - gml, gamemakerlanguage
GAP (CAS) - gap
G-code - gcode
GDScript - gdscript
GEDCOM - gedcom
gettext - gettext, po
Gherkin - gherkin
Git - git
GLSL - glsl
GN - gn, gni
GNU Linker Script - linker-script, ld
Go - go
Go module - go-module, go-mod
Gradle - gradle
GraphQL - graphql
Groovy - groovy
Haml - haml
Handlebars - handlebars, hbs, mustache
Haskell - haskell, hs
Haxe - haxe
HCL - hcl
HLSL - hlsl
Hoon - hoon
HTTP - http
HTTP Public-Key-Pins - hpkp
HTTP Strict-Transport-Security - hsts
IchigoJam - ichigojam
Icon - icon
ICU Message Format - icu-message-format
Idris - idris, idr
.ignore - ignore, gitignore, hgignore, npmignore
Inform 7 - inform7
Ini - ini
Io - io
J - j
Java - java
JavaDoc - javadoc
JavaDoc-like - javadoclike
Java stack trace - javastacktrace
Jexl - jexl
Jolie - jolie
JQ - jq
JSDoc - jsdoc
JS Extras - js-extras
JSON - json, webmanifest
JSON5 - json5
JSONP - jsonp
JS stack trace - jsstacktrace
JS Templates - js-templates
Julia - julia
Keepalived Configure - keepalived
Keyman - keyman
Kotlin - kotlin, kt, kts
KuMir (КуМир) - kumir, kum
Kusto - kusto
LaTeX - latex, tex, context
Latte - latte
Less - less
LilyPond - lilypond, ly
Liquid - liquid
Lisp - lisp, emacs, elisp, emacs-lisp
LiveScript - livescript
LLVM IR - llvm
Log file - log
LOLCODE - lolcode
Lua - lua
Magma (CAS) - magma
Makefile - makefile
Markdown - markdown, md
Markup templating - markup-templating
Mata - mata
MATLAB - matlab
MAXScript - maxscript
MEL - mel
Mermaid - mermaid
METAFONT - metafont
Mizar - mizar
MongoDB - mongodb
Monkey - monkey
MoonScript - moonscript, moon
N1QL - n1ql
N4JS - n4js, n4jsd
Nand To Tetris HDL - nand2tetris-hdl
Naninovel Script - naniscript, nani
NASM - nasm
NEON - neon
Nevod - nevod
nginx - nginx
Nim - nim
Nix - nix
NSIS - nsis
Objective-C - objectivec, objc
OCaml - ocaml
Odin - odin
OpenCL - opencl
OpenQasm - openqasm, qasm
Oz - oz
PARI/GP - parigp
Parser - parser
Pascal - pascal, objectpascal
Pascaligo - pascaligo
PATROL Scripting Language - psl
PC-Axis - pcaxis, px
PeopleCode - peoplecode, pcode
Perl - perl
PHP - php
PHPDoc - phpdoc
PHP Extras - php-extras
PlantUML - plant-uml, plantuml
PL/SQL - plsql
PowerQuery - powerquery, pq, mscript
PowerShell - powershell
Processing - processing
Prolog - prolog
PromQL - promql
.properties - properties
Protocol Buffers - protobuf
Pug - pug
Puppet - puppet
Pure - pure
PureBasic - purebasic, pbfasm
PureScript - purescript, purs
Python - python, py
Q# - qsharp, qs
Q (kdb+ database) - q
QML - qml
Qore - qore
R - r
Racket - racket, rkt
Razor C# - cshtml, razor
React JSX - jsx
React TSX - tsx
Reason - reason
Regex - regex
Rego - rego
Ren'py - renpy, rpy
ReScript - rescript, res
reST (reStructuredText) - rest
Rip - rip
Roboconf - roboconf
Robot Framework - robotframework, robot
Ruby - ruby, rb
Rust - rust
SAS - sas
Sass (Sass) - sass
Sass (SCSS) - scss
Scala - scala
Scheme - scheme
Shell session - shell-session, sh-session, shellsession
Smali - smali
Smalltalk - smalltalk
Smarty - smarty
SML - sml, smlnj
Solidity (Ethereum) - solidity, sol
Solution file - solution-file, sln
Soy (Closure Template) - soy
SPARQL - sparql, rq
Splunk SPL - splunk-spl
SQF: Status Quo Function (Arma 3) - sqf
SQL - sql
Squirrel - squirrel
Stan - stan
Stata Ado - stata
Structured Text (IEC 61131-3) - iecst
Stylus - stylus
SuperCollider - supercollider, sclang
Swift - swift
Systemd configuration file - systemd
T4 templating - t4-templating
T4 Text Templates (C#) - t4-cs, t4
T4 Text Templates (VB) - t4-vb
TAP - tap
Tcl - tcl
Template Toolkit 2 - tt2
Textile - textile
TOML - toml
Tremor - tremor, trickle, troy
Turtle - turtle, trig
Twig - twig
TypeScript - typescript, ts
TypoScript - typoscript, tsconfig
UnrealScript - unrealscript, uscript, uc
UO Razor Script - uorazor
URI - uri, url
V - v
Vala - vala
VB.Net - vbnet
Velocity - velocity
Verilog - verilog
VHDL - vhdl
vim - vim
Visual Basic - visual-basic, vb, vba
WarpScript - warpscript
WebAssembly - wasm
Web IDL - web-idl, webidl
WGSL - wgsl
Wiki markup - wiki
Wolfram language - wolfram, mathematica, nb, wl
Wren - wren
Xeora - xeora, xeoracube
XML doc (.net) - xml-doc
Xojo (REALbasic) - xojo
XQuery - xquery
YAML - yaml, yml
YANG - yang
Zig - zig
```

| Language | !lang | Language  | !lang  |
|----------|-------|-----------|--------|
| CSS      | !CSS  | C-LIKE    | !CLIKE |
| C        | !C    | C++       | !CPP   |


## What can I do with it?
You can open more than one tab and paste different code into each tab. And share it in markdown community without spamming so much content. They can open the URLs and see the text you pasted. Also can create the **same** URL by pasting the same text. This is useful for sharing code snippets. You can also use it to share text with your friends.

## Example
This is an example of the source code of our project: [paste](https://zhenglinlei.github.io/paste-code/#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) and other example [paste2](https://ZhengLinLei.github.io/paste-code/#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)

## Service
Try it! [https://zhenglinlei.github.io/paste-code/](https://zhenglinlei.github.io/paste-code/)

## Dependencies
This project uses [lzma.js](https://github.com/LZMA-JS/LZMA-JS) and native [Base64](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding) functions.

## License
MIT License