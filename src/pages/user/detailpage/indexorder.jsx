import DetailOrderComponent from "../../../compoment/DetailPageCompoment/DetailOrder";
import { memo } from "react";
import '../../../style/page/detail.css'

const Detailorderpage = ({ order }) => {
   

    return (
       <DetailOrderComponent/>
    );
};

export default memo(Detailorderpage);

