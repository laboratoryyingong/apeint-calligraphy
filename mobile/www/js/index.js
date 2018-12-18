/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

        /**
         * @description: main writer functions
         **/

        var writer = HanziWriter.create('character-target-div', '焱', {
            width: 260,
            height: 260,
            padding: 5,
            showOutline: true,
            strokeColor: '#272727',
            showHintAfterMisses: 1,
            charDataLoader: function (char, onComplete) {
                $.getJSON("components/hanzi-writer-data/data/" + char + ".json", function (charData) {
                    onComplete(charData);
                });
            }
        });

        $('#animate-button').on('click', function(){
            writer.animateCharacter();
        });

        $('#quiz-button').on('click', function () {
            writer.quiz({
                onMistake: function (strokeData) {
                    // console.log('Oh no! you made a mistake on stroke ' + strokeData.strokeNum);
                    // console.log("You've made " + strokeData.mistakesOnStroke + " mistakes on this stroke so far");
                    // console.log("You've made " + strokeData.totalMistakes + " total mistakes on this quiz");
                    // console.log("There are " + strokeData.strokesRemaining + " strokes remaining in this character");
                    $("#hint").text("您的第" + (parseInt(strokeData.strokeNum) + 1) + "画写错了，请重写。");
                },
                onCorrectStroke: function (strokeData) {
                    // console.log('Yes!!! You got stroke ' + strokeData.strokeNum + ' correct!');
                    // console.log('You made ' + strokeData.mistakesOnStroke + ' mistakes on this stroke');
                    // console.log("You've made " + strokeData.totalMistakes + ' total mistakes on this quiz');
                    // console.log('There are ' + strokeData.strokesRemaining + ' strokes remaining in this character');
                    $("#hint").text("您的第" + (parseInt(strokeData.strokeNum) + 1) + "画完全正确，恭喜你。");
                },
                onComplete: function (summaryData) {
                    console.log('You did it! You finished drawing ' + summaryData.character);
                    console.log('You made ' + summaryData.totalMistakes + ' total mistakes on this quiz');
                    $("#hint").text("您已经顺利写完 " + summaryData.character + " 一共写错了" + summaryData.totalMistakes + "画");
                }
            });
        });

    }
};

app.initialize();