import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Parks from './Parks';


class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "Parks"
        }
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Parks'}
                    title="Parks"

                    badgeText="1"
                    onPress={() => this.setState({ selectedTab: 'Parks' }) }>
                    <Parks />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'Settings'}
                    title="Settings"


                    onPress = {() => this.setState({ selectedTab: 'Settings' }) }>
                    <View>
                        <Text>Settings</Text>
                    </View>
                </TabNavigator.Item >
            </TabNavigator >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
});

export default Layout;