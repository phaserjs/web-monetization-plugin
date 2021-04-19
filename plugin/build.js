const { buildSync } = require('esbuild');
const fs = require('fs-extra');
const rollup = require('rollup');
const rollupTypeScript = require('@rollup/plugin-typescript');
const TypeDoc = require('typedoc');

const package = fs.readJsonSync(fx + '/package.json');

const shortName = package.displayName;
const fullName = package.description;
const version = package.version;

const src = '/src/';
const dist = '/dist/';
const docs = '/docs/';

async function buildES6 ()
{
    fs.emptyDirSync(dist);
    
    buildSync({
        entryPoints: '/src/GameWebMonetization.ts',
        outfile: '/dist/GameWebMonetization.js',
        target: 'es6',
        format: 'esm',
        bundle: true
    });
    
    // let data = fs.readFileSync(outfile, { encoding: 'utf8' });
    
    // data = data.replace('import Phaser from "phaser";', '');
        
    // fs.writeFileSync(outfile, data, 'utf8');
    
    console.log('ES6 Build Generated ✔️');
}


async function buildES5 ()
{
    const inputOptions = {
        input: src + shortName + '.ts',
        external: [ 'phaser' ],
        plugins: [
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
        file: dist + shortName + '.es5.js',
        name: 'FX',
        format: 'iife',
        globals: {
            'phaser': 'Phaser'
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
        src + shortName + '.ts'
    ]);

    console.log('TypeScript Defs Generated ✔️');
}

async function buildDocs ()
{
    //  Prepare index.md

    fs.removeSync(destMedia + 'index.md');

    let index = fs.readFileSync(srcMedia + 'index.md', { encoding: 'utf8' });

    index = index.replace(/FULLNAME/g, fullName);
    index = index.replace(/NAME/g, shortName);

    fs.writeFileSync(destMedia + 'index.md', index, 'utf8');

    const app = new TypeDoc.Application();
    
    app.options.addReader(new TypeDoc.TypeDocReader());
    app.options.addReader(new TypeDoc.TSConfigReader());

    app.bootstrap({
        entryPoints: [ src + shortName + '.ts' ],
        media: destMedia,
        readme: destMedia + 'index.md',
        tsconfig: './tsconfig.json',
        excludeExternals: true,
        excludePrivate: true,
        name: fullName,
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
    console.log('Building');

    await buildES6();
    // await buildES5();
    // await buildDefs();
    // await buildDocs();
}

run();
