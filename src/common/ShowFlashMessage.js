import {showMessage,hideMessage} from 'react-native-flash-message';

const ShowFlashMessage = (msg) =>{
    return(
        showMessage({
            message:'Book Store App',
            description:msg,
            type:'warning',
            color:'white',
            icon:'info',
            autoHide:true,
            duration:2000,
            onPress: () => {
                hideMessage();
            },
            hideOnPress:true
        })
    );
};

export default ShowFlashMessage;

