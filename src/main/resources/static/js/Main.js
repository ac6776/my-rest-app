var messageApi = Vue.resource('http://localhost:8080/api/msg{/id}')

function getId(message, messages) {
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].id === message.id)
        return i;        
    }
    return -1;
}

Vue.component("input-message", {
    props: ['messages', 'messageAttr'],
    data: function(){
        return { 
            id: '',
            msg: ''
        }
    },
    watch: {
        messageAttr: function(newVal, oldVal) {
            this.msg = newVal.msg;
            this.id = newVal.id;
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
            var message = { id: this.id, msg: this.msg }

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                    result.json().then(data => {
                        console.log(data)
                        var i = getId(data, this.messages)
                        this.messages.splice(i, 1, data)
                    })
                )
            } else {
                messageApi.save({}, message).then(result => 
                    result.json().then(data => {
                        this.messages.push(data)
                    })
                )
            }            
            this.msg = ''
            this.id = ''      
        }
    }
  });

Vue.component('message-row', {
    props: ['message', 'messages', 'editMessage'],
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
            this.editMessage(this.message)
        },
        del: function() {
            messageApi.remove({id : this.message.id}).then(result => {
                this.msg = result.body;
                this.messages.splice(getId(this.msg, this.messages), 1);
            })
        }
    }
})

Vue.component('messages-list', {
    props: ['messages'],
    data: function(){
        return {
            message: null
        }
    },
    template: 
        '<div>' +
            '<input-message :messages="messages" :messageAttr="message"/>' +
            '<message-row v-for="message in messages" v-bind:key="message.id" :message="message" :messages="messages" :editMessage="editMessage"/>' +
        '</div>',
    created: function() {
        messageApi.get().then(result => 
            result.json().then(data => 
                data.forEach(message => this.messages.push(message))
            )
        )
    },
    methods: {
        editMessage: function(message) {
            this.message = message
        }
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