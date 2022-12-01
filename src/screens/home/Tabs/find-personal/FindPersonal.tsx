import { ActivityIndicator } from "@react-native-material/core";
import axios from "axios";
import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//@ts-ignore
import styled from "styled-components/native";
import { PERSONAL_TRAINERS_LIST } from "../../../../services/global";

export default function FindPersonal() {
  const Container = styled.View`
    flex: 1;
    background-color: ${(props: any) => props.theme.TABS_BACKGROUND};
  `;
  const InputContainer = styled.View`
    width: 90%;
    height: 40px;
    padding-horizontal: 10px;
    flex-direction: row;
    border-radius: 8px;
    align-items: center;
    background-color: ${(props: any) => props.theme.INPUT_BACKGROUND};
  `;

  const [personal, setPersonal] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(PERSONAL_TRAINERS_LIST);
        setPersonal(res.data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container
      style={{
        paddingHorizontal: 15,
        paddingTop: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          marginTop: 10,
          maxHeight: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputContainer>
          <Icon name="arm-flex" size={18} />
          <TextInput
            style={{ marginLeft: 15 }}
            placeholder="Busque seu Personal"
          />
        </InputContainer>
        <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Icon name="filter-menu" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}
      >
        <View
          style={{
            height: 1,
            borderBottomWidth: 2,
            borderBottomColor: "#000",
            flex: 1,
          }}
        />
        <Text style={{ paddingHorizontal: 15 }}>Profissionais</Text>
        <View
          style={{
            height: 1,
            borderBottomWidth: 2,
            borderBottomColor: "#000",
            flex: 1,
          }}
        />
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 55 }} size={40} color="#000" />
      ) : !!personal && personal.length > 0 ? (
        <ScrollView style={{ marginTop: 25 }}>
          {personal.map((p, i) => (
            <TouchableOpacity
              key={i}
              style={{
                height: 350,
                width: "90%",
                alignSelf: "center",
                marginBottom: 50,
              }}
            >
              <View
                style={{
                  height: "70%",
                  backgroundColor: "#2E2E2E",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#FFE15A",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  padding: 10,
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{p.name}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: 70,
                      backgroundColor: "#fff",
                      justifyContent: "space-around",
                      padding: 5,
                      paddingRight: 8,
                      borderRadius: 16,
                    }}
                  >
                    <Icon name="star" size={20} color="#FFE15A" />
                    <Text>{(Math.random() * 5).toFixed(1)}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginVertical: 10,
                  }}
                >
                  {p.personal_specialty.map((speciality: any) => (
                    <Text
                      key={`${speciality["specialty"].name} - Specialty`}
                      style={{
                        backgroundColor: "#2E2E2E",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 10,
                        color: "#BDBDBD",
                        marginHorizontal: 3,
                        marginBottom: 5,
                      }}
                    >
                      {speciality["specialty"].name}
                    </Text>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View>
          <Text>Não há profissionais disponíveis no momento</Text>
        </View>
      )}
    </Container>
  );
}
