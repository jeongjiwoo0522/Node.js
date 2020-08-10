function outerFunc() {
    const x = 10;
    const innerFunc = function() { console.log(x) };
    innerFunc();
}

outerFunc();