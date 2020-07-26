window.fn = {};

window.fn.toggleMenu = function () {
  document.getElementById('appSplitter').right.toggle();
};

window.fn.loadView = function (index) {
  document.getElementById('appTabbar').setActiveTab(index);
  document.getElementById('sidemenu').close();
};

window.fn.loadLink = function (url) {
  window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
  if (anim) {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title }, animation: anim });
  } else {
    document.getElementById('appNavigator').pushPage(page.id, { data: { title: page.title } });
  }
};

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDiLRSKZJU8F5UhTFHmMyHa0qB1CAzMuLw",
  authDomain: "it60-42-choen-savoey.firebaseapp.com",
  databaseURL: "https://it60-42-choen-savoey.firebaseio.com",
  projectId: "it60-42-choen-savoey",
  storageBucket: "it60-42-choen-savoey.appspot.com",
  messagingSenderId: "208922727243",
  appId: "1:208922727243:web:45cb03e5d2eebb8a948ece",
  measurementId: "G-0KGMXHYKEJ"
};
firebase.initializeApp(firebaseConfig);


//form onsen UI
document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'home.html') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
    };
  } else if (page.id === 'page2') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});