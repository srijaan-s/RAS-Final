const form = document.querySelector("form"),
    fileInput = form.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", ()=>{
    fileInput.click();
});

fileInput.onchange = ({target}) =>{
   let file = target.files[0]; //getting files
    if(file){ // if file is selected
        let fileName = file.name; // getting file
        if(fileName.length >= 12){
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
        }
        uploadedFile(fileName); // calling upload file
    }
}

function uploadedFile(name) {
    let xhr = new XMLHttpRequest(); // creating new xml obj AJAX
    xhr.open("POST", "../php/upload.php"); // sending post request
    xhr.upload.addEventListener("progress", ({loaded, total}) =>{
        let fileLoaded = Math.floor((loaded/total)*100) //getting the percentage for loading
        let fileTotal = Math.floor(total/1000); // getting file size in KB
        let fileSize;
        // if file size is less than 1024 then add only KB else convert size into KB to MB
        (fileTotal <1024) ? fileSize = fileTotal + "KB" : fileSize = (loaded/(1024 * 1024)).toFixed(2) + " MB";
        let progressHTML = '<li class="row">' +
            '                   <i class="fas fa-file-alt"></i> ' +
            '                   <div className="content"> ' +
            '                       <div className="details"> ' +
            '                           <span className="name">${name} - Uploading</span> ' +
            '                           <span className="percent">${fileLoaded}%</span> ' +
            '                       </div> ' +
            '                       <div className="progress-bar"> ' +
            '                           <div className="progress" style="width: ${fileLoaded}%">' +
            '                           </div> ' +
            '                       </div> ' +
            '                   </div> ' +
            '               </li>';

        uploadedArea.classList.add("onprogress");
       progressArea.innerHTML = progressHTML;
       if(loaded === total){
           progressArea.innerHTML = "";
           let uploadedHTML = '<li class="row">\n' +
            '                <div class="content">\n' +
            '                    <i class="fas fa-file-alt"></i>\n' +
            '                    <div class="details">\n' +
            '                        <span class="name">${name} - Uploaded</span>\n' +
            '                        <span class="size">{fileSize}%</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <i class="fas fa-check"></i>\n' +
            '            </li>';
           uploadedArea.classList.remove("onprogress");
        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
       }
       });

    let formData = new FormData(form); //fromData is an object to easily send form data
    xhr.send(formData); // sending form data to php
}