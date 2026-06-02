type ButtonProps = {title: string; onClick?:() => void;};
function Button({title, onClick}: ButtonProps){
    return(
        <button onClick={onClick}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            {title}
        </button>
    );
}
export default Button;