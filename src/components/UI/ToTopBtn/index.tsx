import { FC, useEffect, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import './styles.scss';

const ToTopBtn: FC = () => {

  const [isToTopBtnVisible, setIsToTopBtnVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 180 ? setIsToTopBtnVisible(true) : setIsToTopBtnVisible(false)
    })
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      {isToTopBtnVisible && 
        <Tooltip title="Наверх">
          <Button className="to-top-btn" shape="circle" size="large" icon={<ArrowUpOutlined />} onClick={scrollUp} />
        </Tooltip>}
    </>
    
  )
};

export default ToTopBtn;