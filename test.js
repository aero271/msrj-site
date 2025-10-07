async function a()
{
    const response = await fetch('https://masteryjournel.freedynamicdns.org/index.php/msrj/api/v1/submissions/',
    {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.WyIxNzc4NTcwZmE5YWQ5OGM2ZjRjYmNhYjYzOTJjYTUyMTZkZDhjMjhhIl0.VbJ8aRLFIXLN4yp3SRZt0slE3wUInGHBzkEinEBk-g8'
        }                
    });
    console.log(await response.json());
}
a();