import React from 'react';
import {
  Table,
  Button,
  Pagination
} from 'antd';

const pageSize = 8;

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items_list: [],
      currentPage: 1,
      minIndex: 0,
      maxIndex: pageSize,
    }
  }

  componentDidMount() {
    this.getPhotoList();
  }

  //Get Photp List 
  async getPhotoList() {
    let request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    let response = await fetch('https://jsonplaceholder.typicode.com/photos', request);
    const result = await response.json();
    if (result) {
      var dataResult = result.filter(item => item.id <= 100);
      console.log(dataResult)
      this.setState({ items_list: dataResult });
    }
  }

  //Pagination Onchange
  handleChange = (page) => {
    this.setState({
      currentPage: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize
    });
  };


  render() {
    const { items_list, currentPage, minIndex, maxIndex } = this.state;

    const compareColumns = [
      {
        title: 'Photo Image',
        key: 'photoImage',
        dataIndex: 'photoImage'
      },
      {
        title: 'Id',
        key: 'photoID',
        dataIndex: 'photoID'
      },
      {
        title: 'URL',
        key: 'photoURL',
        dataIndex: 'photoURL'
      },
      {
        title: 'Title',
        key: 'photoTitle',
        dataIndex: 'photoTitle'
      }
    ]

    const compareList = [
      {
        key: '1',
        photoImage: '111',
        photoID: '1',
        photoURL: '###',
        photoTitle: 'Title'
      },
      {
        key: '1',
        photoImage: '111',
        photoID: '1',
        photoURL: '###',
        photoTitle: 'Title'
      },
      {
        key: '1',
        photoImage: '111',
        photoID: '1',
        photoURL: '###',
        photoTitle: 'Title'
      },
      {
        key: '1',
        photoImage: '111',
        photoID: '1',
        photoURL: '###',
        photoTitle: 'Title'
      }
    ]

    return (
      <div className="homeSection container">        
        <div className="home_title">Photo List View</div>
        <div className="item_list_grid">
            <div className="photo_list">
              <div className="photo_list_row">
                {
                  items_list.map((item, idx) => 
                    <React.Fragment key={idx}>
                      {
                        idx >= minIndex && idx < maxIndex && (
                          <div className='photo_list_sec'>
                            <div className="photo_img">
                              <img src={item.thumbnailUrl} alt="Thumb image" width='100' />
                            </div>
                            <div className="photo_title">{item.title ? item.title : ''}</div>
                            <div className="photo_id">{item.id ? item.id : ''}</div>
                            <div className="photo_url">
                              <a href={item.url ? item.url : '#'}>{item.url ? item.url : ''}</a></div>
                            <div className="photo_button">
                              <Button type="primary">Compare</Button>
                            </div>
                          </div>
                        )}
                    </React.Fragment>
                  )
                }
              </div>
            </div>
            {
              items_list.length > 6 && (
                <Pagination
                  pageSize={pageSize}
                  total={items_list.length}
                  onChange={this.handleChange}
                  current={currentPage}
                />
              )
            }
          </div>

          <div className="home_title">Comparison Table</div>
          <Table
            className="comparisonTable"
            dataSource={compareList }
            columns={compareColumns}
            rowKey={(record) => record.id}
            pagination={{
              hideOnSinglePage: compareList.length > 10 ? false : true,
            }}
            
          />

      </div>
    )
  }

}