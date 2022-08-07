import './style.css';
export default function Toaster(){

    return (<>
        <div class="toast">
  
        <div class="toast-content">
            <i class="fas fa-solid fa-check check"></i>

            <div class="message">
            <span class="text text-1">Success</span>
            <span class="text text-2">Your changes has been saved</span>
            </div>
        </div>
        <i class="fa-solid fa-xmark close"></i>

        
        <div class="progress active"></div>
        </div>    
    </>)
}