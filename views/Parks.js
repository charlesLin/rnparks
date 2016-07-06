import React, {Component} from 'react';
import { View, Text, ListView, ActivityIndicator, StyleSheet,
    TouchableHighlight, TouchableOpacity} from 'react-native';
import ParksService from '../services/ParksService';
import Park from './Park';

class Parks extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1._id !== r2._id
        });
        this.state = {
            parks: [],
            dataSource: ds.cloneWithRows([]),
            pageNo: 0,
            pageSize: 10,
            totalCount: null,
            isLoading: false
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
                    >
                </ListView>
            </View>
        );
    }

    renderRow(row) {
        return (
            <TouchableHighlight onPress={() => this.pressRow(row) }
                underlayColor="grey" activeOpacity={0.5}>
                <View style={{ margin: 10 }}>
                    <Text style={{ height: 20 }}>{row._id}   {row.ParkName}</Text>
                </View>
            </TouchableHighlight>);
    }

    renderFooter() {
        if (this.state.isLoading)
            return (
                <View><ActivityIndicator size="large"></ActivityIndicator></View>
            );
    }

    pressRow(row) {
        this.props.navigator.push({
            title: row.ParkName,
            component: Park,
            passProps: { park: row}
        });
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