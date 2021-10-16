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
      compareListData: []
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
    var photoListArray = []
    if (result) {
      result.filter(item => item.id <= 100).map(item => {
        return (
          item.isVisible = true,
          photoListArray = [...photoListArray, item]
        )
      });
      this.setState({ items_list: photoListArray });
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

  //Compare data
  handleCompare = (item) => {
    item.isVisible = false
    this.setState({
      compareListData: [...this.state.compareListData, item]
    })
  }

  //Remove from Compare table
  handleRemoveCompare = (item) => {
    item.isVisible = true
    const result = this.state.compareListData.filter(items => items.id !== item.id);
    this.setState({
      compareListData: result
    })
  }

  render() {
    const { items_list, currentPage, minIndex, maxIndex, compareListData } = this.state;
    var tableData = compareListData.sort((a, b) => a.id - b.id);

    const compareColumns = [
      {
        title: 'Photo Image',
        key: 'thumbnailUrl',
        dataIndex: 'thumbnailUrl',
        render: (value, record) => {
          return (
            <div className="align_center"><img src={value} alt="Thumbnail Url" width='70' /></div>
          )
        }
      },
      {
        title: 'Id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: 'URL',
        key: 'url',
        dataIndex: 'url',
        render: (value, record) => {
          return (
            <a href={value} >{value}</a>
          )
        }
      },
      {
        title: 'Title',
        key: 'title',
        dataIndex: 'title',
        render: (value, record) => {
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
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
                            <img src={item.thumbnailUrl} alt="Thumb" width='100' />
                          </div>
                          <div className="photo_title">{item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : ''}</div>
                          <div className="photo_id">{item.id ? item.id : ''}</div>
                          <div className="photo_url">
                            <a href={item.url ? item.url : '#'}>{item.url ? item.url : ''}</a></div>
                          <div className="photo_button">
                            {
                              item.isVisible && (
                                <Button type="primary"
                                  onClick={() => this.handleCompare(item)}
                                >Compare</Button>

                              )
                            }
                            {
                              !item.isVisible && (
                                <Button
                                  className="remove_button"
                                  onClick={() => this.handleRemoveCompare(item)}
                                >Remove</Button>

                              )
                            }

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
        {
          compareListData.length > 0 && (
            <React.Fragment>
              <div className="home_title">Comparison Table</div>
              <Table
                className="comparisonTable"
                dataSource={tableData}
                columns={compareColumns}
                rowKey={(record) => record.id}
                pagination={{
                  hideOnSinglePage: tableData.length > 10 ? false : true,
                }}

              />
            </React.Fragment>

          )
        }

      </div>
    )
  }

}