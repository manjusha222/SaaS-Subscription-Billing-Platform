type CardProps = {children: React.ReactNode};
function Card({children,}:CardProps){
    return(
        <div
            className ="bg-white p-5 rounded-xl shadow-md">
                {children}
        </div>
    );
}
export default Card;