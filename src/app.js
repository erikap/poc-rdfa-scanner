import { app } from 'mu';
import fs from 'fs';
import jsdom from 'jsdom';
import { analyse } from '@lblod/marawa/rdfa-context-scanner';
import flatten from 'lodash.flatten';
import uniqWith from 'lodash.uniqwith';

function getRdfa(domNode) {
  function isEqual(a, b) {
    return a.subject == b.subject
      && a.predicate == b.predicate
      && a.object == b.object
      && a.datatype == b.datatype;
  }

  const blocks = analyse(domNode);
  const triples = uniqWith(flatten(blocks.map(b => b.context)), isEqual);
  return triples;
}

function toDomNode(snippet) {
  const dom = new jsdom.JSDOM( `<body>${snippet}</body>` );
  return dom.window.document.querySelector('body');
}

app.get('/rdfa', function(req, res) {
  const snippet = fs.readFileSync('/input/example.html', 'utf8');
  console.log(`Loaded HTML snippet:\n${snippet}`);
  const domNode = toDomNode(snippet);
  const graph = getRdfa(domNode);

  console.log(`Found ${graph.length} triples in the document`);
  return res.send({ data: graph }).end();
});
