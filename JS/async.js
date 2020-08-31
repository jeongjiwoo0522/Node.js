// async await
// 깔끔

async function fetchUser() {
  return "ellie";
}

fetchUser().then(console.log);

// await

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  return "Apple";
}

async function getBanana() {
  await delay(1000);
  return "Banana";
}

async function pickFruit() {
  const apple = await getApple();
  const banana = await getBanana();
  return apple + banana;
}

pickFruit().then(console.log);
