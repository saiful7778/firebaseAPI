const obj = { relay3: '', relay1: '1', hemu: '', temp: '', relay4: '', relay2: '' };

for(let x in obj){
    if(obj[x] !== ""){
        let patchData = {
            [x]: +obj[x]
        }
        console.log(JSON.stringify(patchData));
    }
}