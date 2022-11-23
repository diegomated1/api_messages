export default ()=>{
    const random = Math.floor(Math.random()*1e5);
    const unique_id = `${Date.now()}${random}`;
    return unique_id;
}