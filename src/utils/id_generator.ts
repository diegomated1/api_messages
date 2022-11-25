export default (date_now: number):string=>{
    const random = Math.floor(Math.random()*1e5);
    const unique_id = `${date_now}${random}`;
    return unique_id;
}