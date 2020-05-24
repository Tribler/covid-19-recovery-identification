const GetID = () => {

    const url = "http://192.168.1.43:14414/certifcate/id"

    console.log("FETCHING")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
            console.log("RECEIVED")
            console.log(xhr.responseText);
    }

}

export default GetID
