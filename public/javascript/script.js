
document.addEventListener('keypress',(e)=>
{
    console.log(e);
    if(e.key === 'Enter')
    {
        e.preventDefault();
        document.getElementById('myBtn').click();
    }
})