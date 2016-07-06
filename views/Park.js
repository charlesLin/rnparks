import React, {Component} from 'react';
import { View, Text, Image, ScrollView, MapView} from 'react-native';

class Park extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        var park = this.props.park;
        let markers = [
            {
                latitude: parseFloat(park.Latitude),
                longitude: parseFloat(park.Longitude),
                title: park.ParkName,
                subtitle: park.Location
            }
        ];
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 30 }}>{park.ParkName}</Text>
                    <Text>{park.Introduction }</Text>
                    <Image source={{ uri: park.Image }} style={{
                        width: 200, height: 200,
                        alignSelf: 'center'
                    }} />
                    <MapView style={{ height: 300, width: 300, alignSelf: 'stretch' }}
                        region={{
                            latitude: parseFloat(park.Latitude),
                            longitude: parseFloat(park.Longitude),
                            latitudeDelta: 0.002,
                            longitudeDelta: 0.002
                        }}

                        annotations= {markers}
                        />
                </View>

            </ScrollView>
        );
    }

    getDesc() {
        return this.props.park.Introduction.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }
}

export default Park;