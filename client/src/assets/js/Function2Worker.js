export default function functionToWorker(file){
    //return newly created js from file content as blob
    const worker = URL.createObjectURL(new Blob(["self.onmessage = "+file.toString()], {type: "application/javascript"}));
    return new Worker(worker);
}