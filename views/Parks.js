import React, {Component} from 'react';
import { View, Text, ListView, ActivityIndicator, StyleSheet,
    TouchableHighlight, TouchableOpacity, Alert, RefreshControl} from 'react-native';
import ParksService from '../services/ParksService';
import Park from './Park';
import Icon from 'react-native-vector-icons/FontAwesome';
import FavorateService from '../services/FavorateService';


class Parks extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.favorateService = new FavorateService();
        this.state = {
            parks: [],
            dataSource: ds.cloneWithRows([]),
            pageNo: 0,
            pageSize: 10,
            totalCount: null,
            isLoading: false,
            favorates: this.favorateService.getAll(),
            isReloading : false
        };


    }

    componentDidMount() {
        this.getNextPage();
    }

    render() {
        return (
            <View style={{ marginBottom: 60, flex: 1 }}>
                <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this) }
                    onEndReached={this.onEndReached.bind(this) }
                    renderFooter={this.renderFooter.bind(this) }
                    renderSeparator={(sectioId, rowId) => <View key={rowId} style={styles.separator} />}
                    pageSize={100}
                    enableEmptySections={true}
                    refreshControl={<RefreshControl refreshing={this.state.isReloading}
                        onRefresh={this.getNextPage.bind(this)}  /> }
                    >
                </ListView>
            </View>
        );
    }

    renderRow(row) {
        var isFavorate = this.favorateService.contains(parseInt(row._id));
        const myIcon = isFavorate ? (<Icon name="heart" size={20} color="#900"
            style={{
                alignSelf: 'flex-end', alignItems: 'flex-end',
                justifyContent: 'flex-end'
            }} />)
            : null;
        return (
            <TouchableHighlight onPress={this.pressRow.bind(this, row) }
                underlayColor="grey" activeOpacity={0.5}>
                <View style={{ margin: 10, flex: 1, flexDirection: 'row' }}>
                    <Text style={{ height: 20, flex: 1 }}>{row._id}   {row.ParkName}</Text>
                    {  myIcon }
                </View>
            </TouchableHighlight>);
    }

    renderFooter() {
        if (this.state.isLoading)
            return (
                <View><ActivityIndicator size="large"></ActivityIndicator></View>
            );
    }


    isFavorate(parkId) {
        return this.favorateService.contains(parkId);
    }

    pressRow(row) {
        var isFavorate = this.isFavorate(parseInt(row._id));
        let title = isFavorate ? "已收藏" : "收藏";
        this.props.navigator.push({
            title: row.ParkName,
            component: Park,
            passProps: {
                park: row,
                isFavorate: this.isFavorate.bind(this)
            },
            rightButtonTitle: title,
            onRightButtonPress: this.onRightButtonPress.bind(this, row)
        });
        // let favorates = this.state.favorates.concat([parkId]);
        // var newParks = JSON.parse(JSON.stringify(this.state.parks));
        // var park = newParks.find((i) => parseInt(i._id) == parkId);
        // park.like = !park.like;
        // this.setState({
        //     favorates: favorates,
        //     dataSource: this.state.dataSource.cloneWithRows(newParks)
        // });
    }

    onRightButtonPress(park) {
        var parkId = parseInt(park._id);
        var isFavorate = this.isFavorate(parkId);
        if (!isFavorate) {
            let favorates = this.addToFavorates(parkId);

            this.updateFavoratesToUI.call(this, favorates, parkId, park);
            return;
        }

        Alert.alert(
            '警告',
            '確定移除收藏？',
            [
                { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: '確定', onPress: () => {
                        this.favorateService.remove(parkId);
                        var favorates = this.favorateService.getAll();
                        this.updateFavoratesToUI.call(this, favorates, parkId, park);
                    }
                },
            ]
        );



        // var newParks = JSON.parse(JSON.stringify(this.state.parks));
        // this.setState({
        //     favorates: favoratÏes,
        //     dataSource: this.state.dataSource.cloneWithRows(newParks)
        // });

        // var route = this.props.navigator.navigationContext.currentRoute;
        // route.rightButtonTitle = "已收藏";
        // route.title = "已收藏";
        // this.props.navigator.replace(route);
    }

    updateFavoratesToUI(favorates, parkId, park) {
        let index = this.state.parks.findIndex(p => p._id == parkId);
        let newParks = this.state.parks.slice();
        let newPark = JSON.parse(JSON.stringify(park));
        newParks[index] = newPark;
        this.setState({
            favorates: favorates,
            dataSource: this.state.dataSource.cloneWithRows(newParks)
        });

        var route = this.props.navigator.navigationContext.currentRoute;
        route.rightButtonTitle = "已收藏";
        route.title = "已收藏";
        this.props.navigator.replace(route);
    }

    addToFavorates(parkId) {
        this.favorateService.add(parkId);
        return this.favorateService.getAll();
    }

    getNextPage() {
        var state = this.state;
        if (state.isLoading) return;
        let pageNo = state.pageNo + 1;
        state.isLoading = true;
        this.setState({ isLoading: true, pageNo: pageNo });
        state.pageNo += 1;
        var service = new ParksService();
        let skip = state.pageSize * (state.pageNo - 1);
        service.getParks('', skip, state.pageSize).then(data => {
            var items = this.state.parks.concat(data.result.results);
            var totalCount = data.result.count;
            this.setState({
                isLoading: false,
                parks: items,
                totalCount: totalCount,
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    onEndReached(d) {
        if (this.state.parks.length >= this.state.totalCount) return;
        this.getNextPage();
    }

}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        backgroundColor: 'grey',
        height: StyleSheet.hairlineWidth
    }
});

export default Parks;