import './Footer.css';

export default function Footer() {
    return (
        <div className="page-footer">
            <p>&copy; Healthy Vegan Recipes 2022</p>
            
            <p>Plant-based Recipes Blog</p>
            
           
            <ul className='footer-ul'>
                <li><i className="fa-brands fa-square-facebook"></i></li>
                <li><i className="fa-brands fa-square-instagram"></i></li>
                <li><i className="fa-brands fa-square-twitter"></i></li>
            </ul>
        </div>
    )
}