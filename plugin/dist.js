const { buildSync } = require('esbuild');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const fs = require('fs-extra');
const rollup = require('rollup');
const rollupTypeScript = require('@rollup/plugin-typescript');
const tsc = require('node-typescript-compiler')
const TypeDoc = require('typedoc');

const tsconfig = fs.readJsonSync('./tsconfig.json');
const package = fs.readJsonSync('./package.json');

const name = package.displayName;

const src = './src/';
const dist = './dist/';
const docs = './docs/';

async function buildES6 ()
{
    fs.emptyDirSync(dist);
    
    buildSync({
        entryPoints: [ `${src}/${name}.ts` ],
        outfile: `${dist}/${name}.js`,
        target: 'es6',
        format: 'esm',
        bundle: true
    });
        
    console.log('ES6 Build Generated ✔️');
}

async function buildES5 ()
{
    const inputOptions = {
        input: `${src}/${name}.ts`,
        plugins: [
            nodeResolve(),
            commonjs(),
            rollupTypeScript({
                target: 'es5',
                tsconfig: false,
                allowSyntheticDefaultImports: true,
                removeComments: true,
                moduleResolution: 'node',
                sourceMap: false,
                strict: false
            })
        ]
    };

    const outputOptions = {
        file: `${dist}/${name}.es5.js`,
        name,
        format: 'iife',
        globals: {
            'eventemitter3': 'eventemitter3'
        }
    };

    const bundle = await rollup.rollup(inputOptions);

    await bundle.write(outputOptions);
    await bundle.close();

    console.log('ES5 Build Generated ✔️');
}

async function buildDefs ()
{
    await tsc.compile(
    {
        ...tsconfig.compilerOptions,
        'outDir': dist,
        'declarationDir': dist
    },
    [
        `${src}/${name}.ts`
    ]);

    console.log('TypeScript Defs Generated ✔️');
}

async function buildDocs ()
{
    const app = new TypeDoc.Application();
    
    app.options.addReader(new TypeDoc.TypeDocReader());
    app.options.addReader(new TypeDoc.TSConfigReader());

    app.bootstrap({
        entryPoints: [ `${src}/${name}.ts` ],
        tsconfig: './tsconfig.json',
        excludeExternals: true,
        excludePrivate: false,
        name,
        disableSources: true,
        theme: 'minimal'
    });

    //  Hide most output
    app.logger.level = 100;

    const project = app.convert();

    if (project)
    {
        await app.generateDocs(project, docs);

        console.log('Docs Generated ✔️');
    }
}

async function run ()
{
    console.log('Building GameWebMonetization ...');

    await buildES6();
    await buildES5();
    await buildDefs();
    await buildDocs();
}

run();
