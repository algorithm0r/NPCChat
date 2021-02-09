var gameEngine = new GameEngine();

var recurs = { x: recurs, y: 0 };
console.log(recurs);
console.log(recurs.y);

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/buildings.png");
ASSET_MANAGER.queueDownload("./sprites/footman.png");
ASSET_MANAGER.queueDownload("./sprites/archer.png");
ASSET_MANAGER.queueDownload("./sprites/arrow.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	document.getElementById("response1").addEventListener("click", function (e) {
		if (currentChat.resp1.state) footy.state = currentChat.resp1.state;
		if (currentChat.resp1.next) loadChat(currentChat.resp1.next);		
		else loadChat();
	});

	document.getElementById("response2").addEventListener("click", function (e) {
		if (currentChat.resp2.state) footy.state = currentChat.resp2.state;
		if (currentChat.resp2.next) loadChat(currentChat.resp2.next);
		else loadChat();
	});

	document.getElementById("response3").addEventListener("click", function (e) {
		if (currentChat.resp3.state) footy.state = currentChat.resp3.state;
		if (currentChat.resp3.next) loadChat(currentChat.resp3.next);
		else loadChat();
	});


	gameEngine.init(ctx);

	var footy = new Footman(gameEngine, 300, 300);
	gameEngine.addEntity(footy);
	gameEngine.footy = footy;

	gameEngine.addEntity(new Archer(gameEngine, 100, 100, alice));
	gameEngine.addEntity(new Archer(gameEngine, 300, 100, bob));
	gameEngine.addEntity(new Archer(gameEngine, 500, 100, charlene));

	gameEngine.start();
});
