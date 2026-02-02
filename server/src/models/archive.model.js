import mongoose from 'mongoose';

const archiveSchema = new mongoose.Schema({
    // Reference to the user who owned the task
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // The original ID of the task (useful if you ever want to track lifecycle)
    originalTaskId: {
        type: mongoose.Schema.Types.ObjectId
    },
    // Snapshot of the task data
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    priority: {
        type: String
    },
    dueDate: {
        type: Date
    },
    // The state of the task when it was archived
    statusAtArchive: {
        type: String,
        enum: ['todo', 'in-progress', 'completed'],
        required: true
    },
    // Context on why it was moved to history
    archiveReason: {
        type: String,
        enum: ['created', 'completed', 'deleted', 'expired'],
        required: true
    },
    // Record when this happened
    archivedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false // We use archivedAt instead of updatedAt
});

// Indexing for performance
archiveSchema.index({ user: 1, archivedAt: -1 });

export const Archive = mongoose.model('Archive', archiveSchema);