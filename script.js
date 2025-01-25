const light=document.querySelector(".light");
const dark=document.querySelector(".dark");
const download=document.querySelector(".download");
const shareBtn=document.querySelector(".share-btn");
const sizes=document.querySelector(".sizes");
const qrContainer=document.querySelector("#qr-code");
const qrText=document.querySelector(".qr-text");

let lightColor="#fff";
let darkColor="#000";
let size=300;
defaultUrl="https://youtube.com/@AsmrProg";
text=defaultUrl;

light.addEventListener("input",(e)=>{
  lightColor=e.target.value;
  console.log(lightColor);
   generateQRCode();
});

dark.addEventListener("input",(e)=>{
  darkColor=e.target.value;
  console.log(darkColor);
  generateQRCode();
});

sizes.addEventListener("change",(e)=>{
  size=e.target.value;
  generateQRCode();
});

qrText.addEventListener("input",(e)=>{
    const value=e.target.value;
    text=value;
    if(!value){
        text=defaultUrl;
    }
    generateQRCode();
});

async function generateQRCode(){
    qrContainer.innerHTML="";
    new QRCode("qr-code",{
        text,
        height: size,
        width: size,
        colorLight: lightColor, 
        colorDark: darkColor, 
    });
    download.href=await resolveData();
}

function resolveData(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        let img=document.querySelector("#qr-code img");
        if(img.currentSrc){
            resolve(img.currentSrc);
            return;
        }
        const canvas=document.querySelector("canvas");
        resolve(canvas.toDataURL());
    },50);
  })  
}

shareBtn.addEventListener("click",handleShare);
async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveData();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png", {
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing.");
        }
    }, 100);
}

generateQRCode();