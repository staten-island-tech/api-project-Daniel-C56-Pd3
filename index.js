async function getData(HSR) {
    try {
        const respones = await fetch(`${h}`);
        if(respones.status !=200){
            throw new Error(response);
        }else {
            const data = await response.json();
            document.getElementById("api - response").textContent = data.name;
        }
    }catch (error){
        console.log(error);
    }
}
console.log(getData)