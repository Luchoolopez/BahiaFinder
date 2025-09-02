const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { title, description, authorName, contact, images, status } = req.body;
        const post = new Post({
            title,
            description,
            author: req.user.id,
            authorName,
            contact,
            images,
            status
        });
        await post.save();
        res.status(201).json({ message: 'Post creado exitosamente', post });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post', error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al mostrar los posts', error });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error al mostrar el post', error });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, description, authorName, contact, images, status } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title,
            description,
            authorName,
            contact,
            images,
            status
        }, { new: true });
        
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post actualizado correctamente', post });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el post', error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post', error });
    }
};