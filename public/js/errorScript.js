window.addEventListener('DOMContentLoaded', async(event)=>{
    // const errorDiv = document.querySelector('.errors')
    // errorDiv.backgroundImage = `url("../../images/background-9.png")`

    const message1 = event
    const message2 = `Please use the navbar above to navigate back to a known page`
    const speed = 25;
    console.log(event)
    for (let i=0;i<message1.length;i++){
        document.querySelector(`.errors__message1`).innerHTML+=message1[i]
        await new Promise(resolve => {
            setTimeout(resolve, speed)
        })
    }

    for (let i=0;i<message2.length;i++){
        document.querySelector(`.errors__message2`).innerHTML+=message2[i]
        await new Promise(resolve => {
            setTimeout(resolve, speed)
          })
    }
})