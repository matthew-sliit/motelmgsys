export default class File2base64 {
    static async getFile2Base64(file){
        const file2base64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        return await file2base64;
    }
    //<img src={'data:image/jpeg;base64,'+imageBase64} alt={"image"}/>
    static get64Base2Link(base64_string){
        let base64 = base64_string.substring(base64_string.indexOf(",")+1,base64_string.length);
        let base64bin = atob(base64.replace(/\s/g,''));
        let base64binLength = base64bin.length;
        let buffer = new ArrayBuffer(base64binLength);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < base64binLength; i++) {
            view[i] = base64bin.charCodeAt(i);
        }
        let docLinkBlob =  new Blob([view], {type: "image/png"});
        return window.URL.createObjectURL(docLinkBlob);
    }
}