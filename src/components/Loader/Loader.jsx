import { ThreeDots } from 'react-loader-spinner';
import './Loader.scss';

const Loader = () =>{
    return(
        <div className="loader">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName="loader"
              visible={true}
            />
          </div>
    )
}

export default Loader;