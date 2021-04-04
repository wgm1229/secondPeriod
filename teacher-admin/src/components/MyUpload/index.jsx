import React from 'react'
import { Upload, Icon, message } from 'antd';
const Cloud = require('leancloud-storage') //引入上传文件所需要的sdk
Cloud.init({  //对sdk进行初始化操作
  appId: "ed0SfMxDkgLHKOMsPIoNiTlB-gzGzoHsz", //请务必换成自己的id
  appKey: "bBFIjH7SdBXNGYqVTXj5282M",  //请务必换成自己的key
  serverURL: "https://ed0sfmxd.lc-cn-n1-shared.com"
});

function getBase64(img, callback) {  //将本地图片资源文件，转化成base64编码资源
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class MyUpload extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        customRequest={(info)=>{  //自定义上传方法
          // console.log(info);

          getBase64(info.file, imageUrl => {
            const data = { base64: imageUrl };
            // resume.txt 是文件名
            this.setState({loading:true})  //开启loading动画
            const file = new Cloud.File('cfyimg.png', data);  //构建的LeanCloud的文件对象
            file.save().then(res=>{ //执行图片文件的上传操作
              console.log(res);
              this.props.handleImg(res.attributes.url) //将在线图片路径，告知父组件
              this.setState({
                imageUrl: res.attributes.url, //将上传成功后的在线图片路径，作为预览图进行展示
                loading: false,
              })
            })
            
          });
        }}
      >
        {imageUrl || this.props.initimg ? <img src={imageUrl || this.props.initimg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default MyUpload