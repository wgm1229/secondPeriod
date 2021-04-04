import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
const Cloud = require('leancloud-storage');
Cloud.init({
  appId: "iaqHVhzSwqXu9PcDPooWgf2c-gzGzoHsz",
  appKey: "cfjcMi0tm3MOFGXzor059wW2",
  serverURL: "https://iaqhvhzs.lc-cn-n1-shared.com"
});


function getBase64(img, callback) {
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
        customRequest={(info) => {
          console.log(info)
          getBase64(info.file, imageUrl => {
            const data = { base64: imageUrl };
            const file = new Cloud.File('cfyimg.png', data);
            file.save().then(res => {
              console.log(res);
              this.props.handleImg(res.attributes.url)
              this.setState({
                imageUrl:res.attributes.url
              })
            });
          })
        }}
      >
        {imageUrl||this.props.initImg ? <img src={imageUrl||this.props.initImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}

export default MyUpload