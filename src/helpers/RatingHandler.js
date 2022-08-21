export function stars(number) {
    let starsArr = [];
   
    for (let index = 1; index < 6; index++) {
        if(number < index) {
            starsArr.push(<i key={index} className="far fa-star"></i>)

        } else {
            starsArr.push(<i key={index} className="fas fa-star"></i>);
              
        }  
    }
    return starsArr
}