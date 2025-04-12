import { memo } from "react";
import "./banner.css";
import to_bottom from './img/to_bottom.png';

const Banner = () => {
    return  (
        <div id="banner">
        <div className="box-left">
            <h2>
                <span>PVSH</span>
                <br />
                <span>SHOP</span>

            </h2>
            <button>Khám phá ngay</button>
        </div>
      
        <div className="to-bottom" >
            <a href="">
                <img src={to_bottom} alt="" />
            </a>
        </div>
    </div>
    );
};

export default memo(Banner);
