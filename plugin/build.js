const { buildSync } = require('esbuild');
const fs = require('fs-extra');

const package = fs.readJsonSync('./package.json');

const name = package.displayName;

const src = './src/';
const dist = './dist/';

async function buildES6 ()
{
    buildSync({
        entryPoints: [ `${src}/${name}.ts` ],
        outfile: `${dist}/${name}.js`,
        target: 'es6',
        format: 'esm',
        bundle: true
    });
        
    console.log('ES6 Build Generated ✔️');
}

async function run ()
{
    console.log('Building GameWebMonetization ...');

    await buildES6();
}

run();
