var messageApi = Vue.resource('http://localhost:8080/api/msg{/id}')

Vue.component("input-message", {
    props: ['messages'],
    data: function(){
        return { 
            msg: ''
        }
    },
    template:
        '<div class="input-group mb-3">' +
            '<input type="text" class="form-control" placeholder="write new message here..." v-model="msg"/>' +
            '<div class="input-group-append">' +
                '<input type="button" value="save" v-on:click="save" class="btn btn-danger"/>' +
            '</div>' +
        '</div>',
    methods: {
        save: function() {
            var message = { msg: this.msg }
            messageApi.save({}, message).then(result => 
                result.json().then(data =>
                    this.messages.push(data)
                )    
            )
            this.msg = ''
        }
    }
  });

Vue.component('message-row', {
    props: ['message', 'messages'],
    template:
        '<div class="message">' + 
            '<div>{{ message.id }} {{ message.msg }}</div>' + 
            '<button class="btn btn-primary button" type="button" v-on:click="edit">' +
                '<i class="fas fa-pen"></i>' +
            '</button>' +
            '<button class="btn btn-primary button" type="button" v-on:click="del">' +
                ' <i class="fas fa-times"></i>' +
            '</button>' +
        '</div>',
    data: function (){
        return {
            msg: ''
        }
    },
    methods: {
        edit: function() {
            // this.editMethod(this.message);
            alert(this.message.msg)
        },
        del: function() {
            messageApi.remove({id : this.message.id}).then(result => {
                console.log(result)
            })
        }
    }
})

Vue.component('messages-list', {
    props: ['messages'],
    template: 
        '<div>' +
            '<input-message :messages="messages" />' +
            '<message-row v-for="message in messages" v-bind:key="message.id" :message="message" :messages="messages" />' +
        '</div>',
    created: function() {
        messageApi.get().then(result => 
            result.json().then(data => 
                data.forEach(message => this.messages.push(message))
            )
        )
    }
})

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: [],
        message: ''
    },
    methods: {
    }
})