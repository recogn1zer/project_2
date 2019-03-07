# Simplified Private Blockchain

Blockchain has the potential to change the way that the world approaches data. This simplified private blockchain doesn't consist of a consensus and the blocks have a pretty basic structure. Functionalities such as adding blocks, validating blocks, validating the blockchain, but also persisting the blockchain in a levelDB database, are implemented inside this project.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

In this project, the blocks generated throughout the lifecycle of the blockchain are stored in a database and they are retrieved by the blockchain using javascript __Promises__. The functions, *addLevelDBData*, *getLevelDBData*, *addDataToLevelDB*, *getBlocksCount*, *getDBdataArray*,  implemented inside the __levelSandbox.js__ file, are utilised for the purpose of intercting with the database and achieve persistence.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].
Having NPM installed, several dependencies should be installed.

### Configuring your project

- Use NPM to initialize your project and install system specific software dependencies enclosed to package.json.
```
npm install
```


## Testing

To test code follow the steps:

1: Open a command prompt or shell terminal after install node.js.

2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste your code into your node session

4: Instantiate blockchain with blockchain variable
```
let blockchain = new Blockchain();
```
5: Generate 10 blocks using an asynchronous for loop
```
(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block("Test Block - " + (i + 1));
		blockchain.addBlock(blockTest).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 10000);
})(0);
```
6: Validate blockchain
```
blockchain.validateChain();
```
