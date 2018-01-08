<template>
    <div>
        <span v-if="!isConnected || !statuses">Not connected to the server.</span>
        <ul v-else>
            <li v-for="(status, train) in statuses">
                <span>Train {{ train }} </span>
                <span v-if="!status.action">
                    is waiting in station {{ status.station }}
                </span>
                <span v-if="status.action == 'reverse'">
                    is reversing in station {{ status.station }}
                </span>
                <span v-if="status.action == 'depart'">
                    is departing from {{ status.station }} to {{ status.next_station }}
                </span>
                <span v-if="status.action == 'arrive'">
                    arrived to {{ status.station }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'train-status',
    data () {
        return {
            isConnected: false,
            statuses: null
        }
    },
    sockets: {
        connect() {
            this.isConnected = true;
        },
        disconnect() {
            this.isConnected = false;
        },
        init_update(statuses) {
            this.statuses = statuses;
        },
        update({train, data}) {
            this.statuses[train] = data;
        }
    },
}
</script>