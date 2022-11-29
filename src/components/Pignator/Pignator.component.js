import "./Pignator.component.scss";
import { FaPlus, FaMinus } from "react-icons/fa";

const Pignator = ({ minus, add, pageNum }) => {
    return (
        <div className="pignator">
            <div className="minus" onClick={minus}>
                <FaMinus fill="white" />
            </div>
            <div className="pageNum">{pageNum}</div>
            <div className="add" onClick={add}>
                <FaPlus fill="white" />
            </div>
        </div>
    );
};
export default Pignator;
