function curse(x){
    if(x === "5")
    {
        return;
    }
    console.log(x)
    curse(x+1)
}

curse(1)