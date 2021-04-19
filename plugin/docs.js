const fs = require('fs-extra');
const TypeDoc = require('typedoc');

const package = fs.readJsonSync('./package.json');

const name = package.displayName;

const src = './src/';
const docs = './docs/';

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

    await buildDocs();
}

run();
