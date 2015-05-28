var UI = require('ui');
var ajax = require('ajax');
var URL = 'http://futbol-api.herokuapp.com/games';

var card = new UI.Card({
  title: 'Futbolive',
  subtitle: 'Cargando ...'
});

card.show();

var parseFeed = function(data) {
  console.log('Data: ', data);
  var liveItems = [],
      comingItems = [];
  data.forEach(function(item) {
    var title = item.local_name + ' - ' + item.visitor_name,
        subtitle = (item.status === 'live') ? item.local_goals + ' - ' + item.visitor_goals + ' ' + item.time : item.time;
    
    console.log('Item: ', item);
    
    var formatedItem = {
      title: title,
      subtitle: subtitle
    };
    
    if(item.status === 'live') {
      liveItems.push(formatedItem);
    } else {
      comingItems.push(formatedItem);
    }
  });

  return [liveItems, comingItems];
};

ajax(
  {
    url: URL,
    type:'json'
  },
  function(data) {
    var parsedData = parseFeed(data);
    var resultsMenu = new UI.Menu({
      sections: [{
        title: 'En Vivo',
        items: parsedData[0]
      },
      {
        title: 'Proximanente',
        items: parsedData[1]
      }]
    });

    // Show the Menu, hide the splash
    resultsMenu.show();
    card.hide();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
