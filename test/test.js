(() => {
  const fs = require('fs');
  const LIWCDictionary = require('../build/src/index');

  const dictionaryContainer = new LIWCDictionary.DictionaryContainer();

  fs.readFile('test/verbs.dic', 'utf8', (err, data) => {
    if (err) throw err;

    // Add dictionary
    dictionaryContainer.addDictionary('test', data)
      .then((dictionary) => {
        console.log(`Added dictionary ${dictionary.name} with id ${dictionary.id} to container.`);

        // Add category
        dictionaryContainer.addCategory(dictionary.id, {
          id: 999,
          name: 'nonsense',
          description: 'a test category',
          children: [0, 1],
          parent: 2,
        }, 'en-US')
          .then((data) => {
            console.log('Added category to dictionary.');

            // Add value
            dictionaryContainer.addValue(dictionary.id, {
              name: 'rowing',
              categories: [999]
            }, 'en-US')
              .then((data) => {
                console.log('Added value to dictionary.');

                // Remove value
                dictionaryContainer.removeValue(dictionary.id, 'rowing', 'en-US')
                  .then((data) => {
                    console.log('Removed value from dictionary.');

                    // Remove category
                    dictionaryContainer.removeCategory(dictionary.id, 999)
                      .then((data) => {
                        console.log('Removed category from dictionary.');

                        // Rename dictionary
                        dictionaryContainer.renameDictionary(dictionary.id, 'changed', 'en-US')
                          .then((data) => {
                            console.log('Renamed dictionary.');

                            // write container to JSON
                            fs.writeFile('test/dictionary.json', JSON.stringify(dictionaryContainer, ((_k, v) => v instanceof RegExp ? v.source : v), 2), (err, data) => {
                              if (err) throw err;
                              console.log(`Stringified dictionary ${dictionary.name} to dictionary.json.`);
                            });
                          })
                          .catch((err) => {
                            console.error(`Error renaming dictionary: `, err);
                          })
                      })
                      .catch((err) => {
                        console.error(`Error removing category from dictionary: `, err);
                      })
                  })
                  .catch((err) => {
                    console.error(`Error removing value from dictionary: `, err);
                  })
              })
              .catch((err) => {
                console.error(`Error adding value to dictionary: `, err);
              })
          })
          .catch((err) => {
            console.error(`Error adding category to dictionary: `, err);
          })
      })
      .catch((err) => {
        console.error(`Error adding dictionary to container: `, err);
      });
  });
})();
